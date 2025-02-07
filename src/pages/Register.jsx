// pages/login/index.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   password: '',
   confirmPassword: ''
 });
 const navigate = useNavigate();

 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 };

 const handleSubmit = (e) => {
   e.preventDefault();
   if(formData.password !== formData.confirmPassword) {
     alert('Passwords do not match');
     return;
   }
   // Add login logic here
 };

 return (
   <div className="login-page">
     <div className="pattern" />
     
     <div className="login-container">
       <div className="login-content">
         <h1>Criar uma conta</h1>
         <p>Se inscreva na nossa comunidade!</p>

         <form onSubmit={handleSubmit} className="login-form">
           <div className="form-group">
             <label>Nome</label>
             <input 
               type="text"
               name="name"
               value={formData.name}
               onChange={handleChange}
               placeholder="Preencha seu nome"
               required
             />
           </div>

           <div className="form-group">
             <label>Email</label>
             <input 
               type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               placeholder="Preencha seu email"
               required
             />
           </div>

           <div className="form-group">
             <label>Senha</label>
             <input 
               type="password"
               name="password"
               value={formData.password}
               onChange={handleChange}
               placeholder="Crie uma senha"
               required
             />
           </div>

           <div className="form-group">
             <label>Confirme sua senha</label>
             <input 
               type="password"
               name="confirmPassword"
               value={formData.confirmPassword}
               onChange={handleChange}
               placeholder="Confirme a senha"
               required
             />
           </div>

           <button type="submit" onClick={() => navigate('/')}>Criar uma conta</button>
         </form>

         <p className="register-text">
           Já possui uma conta? <a href="/login">Entrar</a>
         </p>
       </div>
     </div>
   </div>
 );
};

export default Register;