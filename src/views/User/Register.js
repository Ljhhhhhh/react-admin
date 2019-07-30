import React, { useCallback, useState } from "react";
import { Row, Col } from "antd";
import SchemaForm, { Field, FormButtonGroup, Submit, Reset, FormSlot } from "@uform/antd";
import styles from "./register.module.less";

const Register = props => {
  const [avatarLoading, setAvatarLoading] = useState(false)

  const submit = useCallback((e) => {
    console.log(e, 'e')
  }, [])

  const beforeUpload = useCallback((e) => {
    console.log(e, 'beforeUpload')
  }, [])

  const handleChange = (info) => {
    console.log(info, 'info')
    if (info.file.status === 'uploading') {
      setAvatarLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      setAvatarLoading(false)
      console.log(info.file.originFileObj, 'info.file.originFileObj')
    }
  }

  return (
    <div className={styles.container}>
      <Row className={styles.header}>
        <Col>用户注册</Col>
      </Row>
      <Row className={styles.content}>
        <Col>
          <SchemaForm
            labelCol={6}
            wrapperCol={18}
            layout="vertical"
            onSubmit={submit}
            effects={$ => {
              $('onFieldChange', 'avatar').subscribe(fieldState => {
                console.log(fieldState.value, 'fieldState')
              })
            }}
            >
            <Field
              type="string"
              required
              title="用户名"
              name="username"
            />
            <Field
              type="password"
              title="密码"
              name="password"
              required
              x-props={{
                checkStrength: true,
                autoComplete: "new-password"
              }}
            />
            <Field
              type="string"
              title="头像"
              name="avatar"
              x-component="upload"
              limit={1}
              x-props={{
                listType: 'picture-card',
                showUploadList: false,
                action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
                beforeUpload: beforeUpload,
                onChange: handleChange
              }}
            />
            <Field
              type="boolean"
              enum={[
                {label: '男', value: false},
                {label: '女', value: true},
              ]}
              title="性别"
              x-component="radio"
              name="sex"
            />
            <Field type="date" title="出生日期" name="birthday" />
            <FormButtonGroup offset={7}>
              <Submit />
              <Reset />
            </FormButtonGroup>
          </SchemaForm>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
