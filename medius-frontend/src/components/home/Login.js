import { Avatar, Button, Checkbox, FormControlLabel, Grid, TextField, Paper,Link,Typography } from "@material-ui/core"

const Login = () => {

    const paperStyle = { padding: 20, height: '40vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    return (
        <Grid>
            <div>
                <Grid align='center'>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required />
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="#" >
                        Sign Up
                    </Link>
                </Typography>
            </div>
        </Grid>
    )
}

export default Login