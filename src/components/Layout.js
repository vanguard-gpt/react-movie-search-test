import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout () {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    const goInfo = () => navigate('/movie/:id');

    return (
        <>
            <header style={{ background: '#DC143C', padding: 5, fontSize: 30 }}>
                <ul>
                    <p><Link to="/"  style={{ color: '#000000', textDecoration: 'none' }}>영화 조회 서비스</Link></p>
                    {/* <li><Link to="/movie/:id">영화 목록</Link></li> */}
                </ul>
                {/* <button onClick={goBack}>이전 페이지로 이동</button> */}
                {/* <button onClick={goInfo}>정보 페이지로 이동</button> */}
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

//ㅇㅇㅇㅇ