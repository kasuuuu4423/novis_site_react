import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material';
import Login from './Components/Dashboard/Login';
import Configuration from './Components/Dashboard/Configuration';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, logout } from './Modules/Firebase';
import Colors from './Cssvars/Colors';

const CustomBar = styled(AppBar)({
    backgroundColor: Colors.BLACK,
});

type DashboardProps = {
    instructors: Array<any>,
    title: string,
    about: string,
    course: Array<any>,
    plans: Array<any>,
    qanda: Array<any>,
};

const Dashboard: React.FC<DashboardProps> = (props) =>{
    const [user, setUser] = useState<User|null>(null);
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    const siteinfo = {
        instructors: props.instructors,
        title: props.title,
        about: props.about,
        course: props.course,
        plans: props.plans,
        qanda: props.qanda,
    };

    return (
        <div>
            <CustomBar position="fixed">
                <Toolbar sx={{ flexWrap: "wrap", justifyContent: "flex-end" }} variant="dense">
                    <Typography  sx={{ flexGrow: 1 }} variant="h6" color="inherit" component="div">
                        Novis Dashboard
                    </Typography>
                    {user ? <Typography mr={1} variant="h6" color="inherit" component="div">
                        {user.email}
                    </Typography>:""}
                    {user ? <Button onClick={logout} sx={{margin: "5px 0"}} variant="outlined">Logout</Button>:""}
                </Toolbar>
            </CustomBar >
            {!user ? <Login setUser={setUser}/>:""}
            {user ? <Configuration siteinfo={siteinfo}/>:""}
        </div>
    );
}

export default Dashboard;