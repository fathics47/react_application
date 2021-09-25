import { Autocomplete, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function StudentForm(props){
    var [first_name, setFirstName] = useState('')
    var [last_name, setLastName] = useState("")
    var [email, setEmail] = useState("")
    var [mobile, setMobile] = useState("")
    var [dob, setDOB] = useState("")
    var [gender, setGender] = useState("M")
    var [qualification, setQualification] = useState("B.Tech")
    var [prof_pic, setProfPic] = useState('')
    var [skills, setskills] = useState([])
    var [description, setDescription] = useState("")
    var skill = [
        {'name': 'Java', 'value': 'Java'},
        {'name': '.NET', 'value': '.NET'},
        {'name': 'Python', 'value': 'Python'},
        {'name': 'Database', 'value': 'Database'}
    ]
    var [error, setError] = useState({
        'first_name': false,
        'email': false,
        'mobile': false,
        'dob': false,
      'skills': false,
        'prof_pic': false,
    })

    var handleSubmit = () => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var today = new Date();
        if(first_name === '')
        {
            console.log('hi')
            setError({...error, ['first_name']: 'First name is required'})
        }
        else if(email === '')
        {
            setError({...error, ['email']: 'Email is required'})
        }
        else if(!email.match(mailformat)){
            setError({...error, ['email']: 'Email is not valid'})
        }
        else if(mobile === '')
        {
            setError({...error, ['mobile']: 'Mobile is required'})
        }
        else if (mobile.length !== 10){
            setError({...error, ['mobile']: 'Mobile is not valid'})
        }
        else if(dob === '')
        {
            setError({...error, ['dob']: 'Date of Birth is required'})
        }
        else if(new Date(dob) > today)
        {
            setError({...error, ['dob']: 'Date of Birth sould be less than current date'})
        }
        else if(skills.length === 0)
        {
            setError({...error, ['skills']: 'Enter atleast one skill'})
        }
        else if (prof_pic === '' || !prof_pic) {
          setError({...error, ['prof_pic']: "Image required"})
        }
        else
        {
            const fd = new FormData();
            fd.append('first_name', first_name)
            fd.append('last_name', last_name)
            fd.append('email', email)
            fd.append('mobile', mobile)
            fd.append('dob', dob)
            fd.append('gender', gender)
            fd.append('qualification', qualification)
            fd.append('prof_pic', prof_pic)
            fd.append('skills', JSON.stringify(skills))
            fd.append('description', description)

            axios.post('http://localhost:3001/add-student', fd)
                .then(res => {
                    if (res.data !== "success")
                        alert("try again later")
                        handleClear()
                })
        }
    }

    var handleClear = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setMobile('')
        setGender('M')
        setQualification('B.Tech')
        setskills([])
        setDescription('')
        setError({
            'first_name': false,
            'email': false,
            'mobile': false,
            'dob': false,
            'skills': false,
        })

        props.handlecancel();
    }

    return (
      <div>
        <Typography
          component="h2"
          variant="h5"
          style={{ paddingLeft: "30px", paddingTop: "30px" }}
        >
          Add Student
        </Typography>
        <Grid container spacing={2} style={{ padding: "30px" }}>
          <Grid item xs={4}>
            <TextField
              required
              error={error.first_name}
              id="first_name"
              name="first_name"
              label="First Name"
              value={first_name}
              onChange={(e) => {
                setFirstName(e.target.value);
                setError({ ...error, ["first_name"]: false });
              }}
              helperText={error.first_name}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="last_name"
              name="last_name"
              label="Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              error={error.email}
              id="email"
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError({ ...error, ["email"]: false });
              }}
              helperText={error.email}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              error={error.mobile}
              id="mobile"
              name="mobile"
              label="Mobile"
              type="number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setError({ ...error, ["mobile"]: false });
              }}
              helperText={error.mobile}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              error={error.dob}
              id="dob"
              name="dob"
              label="Date of Birth"
              type="date"
              value={dob}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                setDOB(e.target.value);
                setError({ ...error, ["dob"]: false });
              }}
              helperText={error.dob}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <FormControlLabel value="M" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="O" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth required>
              <InputLabel id="qualification_label">Qualification</InputLabel>
              <Select
                labelId="qualification_id"
                id="qualification"
                name="qualification"
                value={qualification}
                label="Qualification"
                onChange={(e) => setQualification(e.target.value)}
              >
                <MenuItem value="B.Tech" style={{"width":"100%","textAlign":"left"}}>B.Tech</MenuItem>
                <MenuItem value="MCA" style={{"width":"100%"}}>MCA</MenuItem>
                <MenuItem value="Graduation" style={{"width":"100%"}}>Graduation</MenuItem>
                <MenuItem value="Post-Graduation" style={{"width":"100%"}}>Post-Graduation</MenuItem>
                <MenuItem value="MBA" style={{"width":"100%"}}>MBA</MenuItem>
                <MenuItem value="Others" style={{"width":"100%"}}>Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" component="label">
              Upload Profile Picture
              <input
                type="file"
                accept="image/png, image/jfif, image/jpeg"
                onInput={(e) => {
                  
                  if (e.target.files[0]) {
                    setProfPic(e.target.files[0]);
                    setError({ ...error, prof_pic: false });
                  }
                  
                }}
                hidden
              />
            </Button>
            <Typography class="file_name">
              {prof_pic && prof_pic.name}
            </Typography>
            {error.prof_pic && (
              <Typography color="error">{error.prof_pic}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="skills"
              options={skill}
              getOptionLabel={(option) => option.name}
              getOptionDisabled={(option) =>
                skills.find((obj) => obj.name === option.name) !== undefined
              }
              onChange={(event, values) => {
                setskills(values);
                setError({ ...error, ["skills"]: false });
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  error={error.skills}
                  {...params}
                  label="Skills"
                  helperText={error.skills}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              placeholder="Enter Desciption"
              id="desciption"
              name="desciption"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              style={{ width: "100%", height: "10vh" }}
            />
          </Grid>
          <Grid item xs={1} sx={{ margin: "1%" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              style={{ color: "white", backgroundColor: "#2e7d32" }}
            >
              Create
            </Button>
          </Grid>
          <Grid item xs={1} sx={{ margin: "1%" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleClear}
              style={{ color: "white", backgroundColor: "#d32f2f" }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    );
}