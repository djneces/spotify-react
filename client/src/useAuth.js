import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  //ACCESS TOKEN
  useEffect(() => {
    axios
      .post('http://localhost:3001/login', { code })
      .then((res) => {
        //access token valid 1hr
        setAccessToken(res.data.accessToken);
        //refresh token => refreshes the access token
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        //this removes all from the URL (we had the code there) => http://localhost:3000/
        window.history.pushState({}, null, '/');
      })
      .catch(() => {
        window.location = '/';
      });
  }, [code]);

  //REFRESH TOKEN
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    //automatic refresh before expires, (setTimeout runs only once)
    const interval = setInterval(() => {
      axios
        .post('http://localhost:3001/refresh', { refreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          console.log(err);
          window.location = '/';
        });
      //1 minute before expires (3600s standard)
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
