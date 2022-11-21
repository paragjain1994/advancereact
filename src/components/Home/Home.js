import React , { useContext} from 'react';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../context/AuthContext';

const Home = () => {
  let authctx1=useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authctx1.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
