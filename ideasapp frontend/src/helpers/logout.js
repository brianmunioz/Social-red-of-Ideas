

const  logout=()=> {
     document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; max-age=0; path=/;";
    localStorage.removeItem('user');    
    localStorage.removeItem('rol');    

  }


export default logout;
