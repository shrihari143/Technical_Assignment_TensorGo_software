import React, { useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import tensorLogo from '../image/Tensor.png';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinishHandler = async () => {
    try {
      const res = await axios.post("/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className="form-container" style={{ borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={tensorLogo} alt="Tensor Logo" style={{ width: "80px", height: "60px" }} />
            <h3 className="text-center">Register Form</h3>
          </div>

          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input type="text" onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input type="password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Link to="/" className="m-2">
            Already a user? Login here
          </Link>

          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
