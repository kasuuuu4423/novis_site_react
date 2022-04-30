import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material';
import Login from './Components/Dashboard/Login';
import Configuration from './Components/Dashboard/Configuration';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from './Modules/Firebase';
import Colors from './Cssvars/Colors';

const CustomBar = styled(AppBar)({
    backgroundColor: Colors.BLACK,
});

type DashboardProps = {
    instructors: Array<any>,
    about: string,
    course: Array<any>,
    plans: Array<any>,
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
        about: props.about,
        course: props.course,
        plans: props.plans,
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
                    {user ? <Button sx={{margin: "5px 0"}} variant="outlined">Logout</Button>:""}
                </Toolbar>
            </CustomBar >
            {!user ? <Login setUser={setUser}/>:""}
            {user ? <Configuration siteinfo={siteinfo}/>:""}
        </div>
    );
}

export default Dashboard;