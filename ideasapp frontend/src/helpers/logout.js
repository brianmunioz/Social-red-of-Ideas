const logout = () => {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; max-age=0";
    localStorage.removeItem('user');
    return window.location = '/';
  }


export default logout;
