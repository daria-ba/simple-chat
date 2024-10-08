import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="">
            неправильный путь
            <h1 class="h4 text-muted">Страница не найдена</h1>
            <p class="text-muted">Но вы можете перейти <Link to={'./'}>на главную страницу</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;