import React from "react";
import { Row, Col } from "antd";
import SchemaForm, { Field, FormButtonGroup, Submit, Reset } from "@uform/antd";
// import '@alifd/next/dist/next.css'

const Register = props => {
  return (
    <div className="container">
      <Row className="header">
        <Col>用户注册</Col>
      </Row>
      <Row className="content">
        <Col>
          <SchemaForm
            defaultValue={{ username: "卢洁辉" }}
            labelCol={4}
            wrapperCol={20}
            layout="inline">
            <Field
              type="string"
              required
              title="用户名"
              x-component="string"
              name="username"
            />
          </SchemaForm>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
