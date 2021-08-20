import { Link, Route, Switch } from "react-router-dom";
import Albums from "./pages/albums/Albums";
import Comments from "./pages/comments/Comments";
import Posts from "./pages/posts/Posts";
import Users from "./pages/users/Users";
import Todos from "./pages/todos/Todos";

function App() {
  return (
    <div className="container">
      <div className="row my-3">
        <div className="col">
          <Link to="/posts">
            <button className="btn btn-outline-primary w-100">Posts</button>
          </Link>
        </div>
        <div className="col">
          <Link to="/users">
            <button className="btn btn-outline-primary w-100">Users</button>
          </Link>
        </div>
        <div className="col">
          <Link to="/comments">
            <button className="btn btn-outline-primary w-100">Comments</button>
          </Link>
        </div>
        <div className="col">
          <Link to="/albums">
            <button className="btn btn-outline-primary w-100">Albums</button>
          </Link>
        </div>
        <div className="col">
          <Link to="/todos">
            <button className="btn btn-outline-primary w-100">Todos</button>
          </Link>
        </div>
      </div>
      <hr />
      <div>
        <Switch>
          <Route path="/posts" component={Posts} />
          <Route path="/users" component={Users} />
          <Route path="/comments" component={Comments} />
          <Route path="/albums" component={Albums} />
          <Route path="/todos" component={Todos} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
