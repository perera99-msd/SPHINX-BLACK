import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import axios from '../utils/axios'; 
import toast from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);

  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      const res = await axios.post('/auth/login', {
        email: data.email,
        password: data.password
      });

      // --- STRICT SEPARATION LOGIC ---
      if (res.data.role === 'admin') {
        dispatch(loginFailure('Invalid Portal'));
        toast.error('Admins must use the Admin Portal.');
        return; // Stop execution
      }
      // -------------------------------

      dispatch(loginSuccess(res.data));
      toast.success('Welcome back.');
      navigate('/profile'); 

    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Invalid email or password';
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-sphynx-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/50 p-8 md:p-12 rounded-2xl border border-white/5 backdrop-blur-sm">
        <h1 className="text-3xl font-display text-white mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-8 text-sm uppercase tracking-widest">Enter the sanctuary</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
            <input 
              {...register("email", { required: true })}
              className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-sphynx-gold outline-none transition-colors"
              placeholder="user@example.com"
            />
            {errors.email && <span className="text-red-500 text-xs mt-1">Required</span>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
            <input 
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-sphynx-gold outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-sphynx-gold text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Not a member? <Link to="/register" className="text-sphynx-gold hover:text-white transition-colors">Apply for access</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;