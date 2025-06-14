import React, { useState } from 'react';
import './Login.css';
import{Form, Input, Button} from 'antd';
import { FaLock, FaUser } from 'react-icons/fa';
import{EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthRepositoryImpl } from '../../domain/repositories/AuthRepositoryImpl';
import { AuthUseCases } from '../../core/useCases/AuthUseCases';
import { Authenticate } from '../../domain/entities/Auth';


const{Password} = Input;

const authRepository= new AuthRepositoryImpl();
const authUseCases= new AuthUseCases(authRepository);


interface LoginProps{
  onLogin: (username: string) => void;
}
const Login: React.FC<LoginProps> = ({onLogin}) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [loading, setLoading]= useState(false);
  const navigate= useNavigate();
  
  const handleSubmit = async(newData: Authenticate) => {
       setLoading(true);
       try{
         console.log("valores ingresados", newData)
        const response= await authUseCases.Authenticate(newData);
        navigate("/dashboard");
        //@ts-expect-error
        const username= response.user.Username;
        //@ts-expect-error
        const role= response.user.Role;
        localStorage.setItem("username", username);
        localStorage.setItem("rol", role);
        onLogin(username);

        console.log(response);

       }catch(error: any){
         console.error('Error al autenticar', error);
         setErrorMessage(error.response.data.Message)
       }finally{
         setLoading(false)
       }
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
                         name="Username"
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
                         name="Password"
                         rules={[{
                          required: true,
                          message: 'Favor de ingresar tu contraseña'
                         }]}
                       >
                         

                         <Password
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
                          loading={loading}
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