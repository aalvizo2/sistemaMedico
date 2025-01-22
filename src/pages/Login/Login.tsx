import React from 'react';
import './Login.css';
import{Form, Input, Button} from 'antd';
import { FaLock, FaUser } from 'react-icons/fa';
import{EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface LoginProps{
  onLogin: (username: string) => void;
}
const Login: React.FC<LoginProps> = ({onLogin}) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const navigate= useNavigate();
  
  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        

        if (values.username === "Admin" && values.password === "ServerAdmin") {
          navigate('/dashboard');
          const username= values.username;
          localStorage.setItem("username", username)
          onLogin(username) ;         
        } else {
          setErrorMessage('Error de Autenticación');
        }

      })
      .catch((errorInfo) => {
        console.error('Error en la validación:', errorInfo);
      });
  };
  
    return (
        <>
          <div className="background">
              <div className="container">
                  <h1>Iniciar Sesión</h1>
                  <div className="form">
                     <Form
                       form={form}
                       layout='vertical'
                       onFinish={handleSubmit}
                       
                     >
                      <div className='input-label'>
                           
                           <span>Usuario: </span>
                         
                      </div>
                       <Form.Item
                         name="username"
                         rules={[{
                          required: true,
                          message: 'Favor de ingresar tu usuario'
                         }]}
                       >
                         

                         <Input 
                           className='input-ant'
                           prefix={
                            <FaUser />
                           }
                           
                           placeholder='Ingresa tu Usuario'
                           
                         />
                       </Form.Item>
                       <div className='input-label'>
                           <label htmlFor="input-form" >
                              <span>Contraseña: </span>
                            </label>
                         </div>
                       <Form.Item
                         name="password"
                         rules={[{
                          required: true,
                          message: 'Favor de ingresar tu contraseña'
                         }]}
                       >
                         

                         <Input.Password 
                           className='input-ant'
                           prefix={
                            <FaLock />
                           }
                           
                           placeholder='Ingresa tu Contraseña'
                           iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                         />
                       </Form.Item>
                       
                       <Button 
                          className='submit-btn'
                          htmlType='submit'
                       >
                         Ingresar
                       </Button>
                       {errorMessage && (
                          <div className='error-message'>
                            {errorMessage}
                          </div>
                       )}
                     </Form>
                  </div>
                  
              </div>
          </div>
        </>
    )
}


export default Login;