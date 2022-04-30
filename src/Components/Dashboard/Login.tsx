import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Alert, TextField, Button, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import {makeStyles} from "@material-ui/styles";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../Modules/Firebase";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
    },
    card: {
        maxWidth: 400,
        width: "90%",
        margin: "auto",
    },
    field: {
        width: "100%",
        marginBottom: "20px",
    },
    cardActions: {
        justifyContent: "center",
        paddingBottom: "20px",
    }
});

type LoginProps = {
    setUser: React.Dispatch<React.SetStateAction<User|null>>,
};

const Login: React.FC<LoginProps> = (props) =>{
    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    let alert: JSX.Element;

    const handleSubmit = async (e) => {
        setLoginEmail(emailRef.current.value);
        setLoginPassword(passwordRef.current.value);
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch(error) {
            alert = <Alert severity="error">"メールアドレスまたはパスワードが間違っています"</Alert>
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: User) => {
            props.setUser(currentUser);
        });
    });

    const classes = useStyles();

    return(
        <form className={classes.container}>
            <Card className={classes.card}>
                <CardHeader title="Login Dashboard"/>
                <CardContent>
                    {alert ?? ""}
                    <TextField inputRef={emailRef} className={classes.field} type="email" label="Email"/>
                    <TextField inputRef={passwordRef} className={classes.field} type="password" label="Password"/>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button onClick={handleSubmit} variant="contained">Login</Button>
                    <Button variant="outlined">Back</Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default Login;