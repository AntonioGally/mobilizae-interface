import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap"
import { MD5 } from "../../scripts/utils.js";

import Index from "./index.jsx";

//Data Base
import { db } from "../../firebase-config"
import { collection, getDocs } from "firebase/firestore"

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const adminsCollectionRef = collection(db, "admins");

  const [isAthenticated, setIsAuthenticated] = useState(false);

  async function getUsers() {
    const data = await getDocs(adminsCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  }


  function onSubmit(value) {
    getUsers().then((data) => {
      data.forEach((el) => {
        if (el.password === MD5(value.password) && el.login === value.login) {
          setIsAuthenticated(true);
          return;
        }
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  if (isAthenticated) {
    return <Index />
  }

  return (
    <div style={{ width: 500, margin: "150px auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text" isInvalid={errors.login}
            {...register("login", {
              required: true,
            })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" isInvalid={errors.password}
            {...register("password", {
              required: true,
            })} />
        </Form.Group>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>

    </div>
  )
}

export default Login;