import React from 'react';

function Menu(props) {
    const param = window.location.pathname
    const user= param.split('/')
    const userName = user[2]
    const d = new Date();
    const month = d.getMonth() + 1
    return (
        <div className="menu">
                        <div className="username">{userName}</div>
                        <div>
                        <div className="ngayThang"><span>{d.getDate()+"/"+month + "/"+d.getFullYear()}</span></div>
                        <div className="logout">
                            <a href="/login">Dang xuat</a>
                        </div>
                        </div>
                </div>
    );
}

export default Menu;