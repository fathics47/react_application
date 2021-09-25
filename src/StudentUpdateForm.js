import { Autocomplete, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export default function StudentUpdateForm(props){
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
    var [image, setImage] = useState("")
    var [orgImageBuffer, setOrgImageBuffer] = useState()
    var id;
    
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
    })

    useEffect(()=>{
        id = props.id
        axios.get(`http://localhost:3001/get-student?id=${props.id}`)
        .then((res)=>{
            console.log(res)
            var data = res.data
            setFirstName(data['first_name'])
            setLastName(data['last_name'])
            setMobile(data['mobile'].toString())
            setEmail(data['email'])
            setGender(data['gender'])
            setDOB(data['dob']?.slice(0,data['dob'].indexOf('T')))
            setQualification(data['qualification'])
            setDescription(data['description'])
            var sk = data['skills']
            var list = []
            sk.map((val,ind)=> {
                list.push({'name': val, 'value': val})
            })
            setskills(list)
            setImage(data['profile_img'])
            setOrgImageBuffer(data['buffer'])
        })
    }, [])

    var handleSubmit = () => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var today = new Date();
        if(first_name === '' || !first_name)
        {
            setError({...error, ['first_name']: 'First name is required'})
        }
        else if(email === '' || !email)
        {
            setError({...error, ['email']: 'Email is required'})
        }
        else if(!email.match(mailformat)){
            setError({...error, ['email']: 'Email is not valid'})
        }
        else if(mobile === '' || !mobile)
        {
            setError({...error, ['mobile']: 'Mobile is required'})
        }
        else if (mobile.length !== 10){
            setError({...error, ['mobile']: 'Mobile is not valid'})
        }
        else if(dob === '' || !dob)
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
            if(prof_pic)
            {
                fd.append('prof_pic', prof_pic)
            }
            fd.append('skills', JSON.stringify(skills))
            fd.append('description', description)

            axios
              .post(
                `http://localhost:3001/edit-student?id=${props.id}`,
                fd
              )
              .then((res) => props.isDone(true));
            
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
        props.isDone(true);
    }

    return (
      <div>
        <Typography
          component="h2"
          variant="h5"
          style={{ paddingLeft: "30px", paddingTop: "30px" }}
        >
          Update Student Details
        </Typography>
        <Grid container spacing={2} style={{ padding: "30px" }}>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <img src={"data:image/png;base64," + image} width="25%" />
          </Grid>
          <Grid item xs={8}>
            <Button variant="contained" component="label">
              Change Profile Picture
              <input
                type="file"
                accept="image/png, image/jfif, image/jpeg"
                onInput={(e) => {
                  setProfPic(e.target.files[0]);
                  var fr = new FileReader();
                  fr.readAsDataURL(e.target.files[0]);
                  fr.onload = function () {
                    setImage(fr.result.slice(fr.result.indexOf(",") + 1));
                  };
                  fr.onerror = function (error) {
                    console.log(error);
                  };
                  console.log(e.target.files[0]);
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
                <MenuItem value="B.Tech">B.Tech</MenuItem>
                <MenuItem value="MCA">MCA</MenuItem>
                <MenuItem value="Graduation">Graduation</MenuItem>
                <MenuItem value="Post-Graduation">Post-Graduation</MenuItem>
                <MenuItem value="MBA">MBA</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="skills"
              options={skill}
              getOptionLabel={(option) => option.name}
              value={skills}
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
              Update
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