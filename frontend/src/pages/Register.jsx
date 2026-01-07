import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/auth/register', data);
      dispatch(loginSuccess(res.data)); // Auto login after register
      toast.success('Account created successfully.');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-sphynx-black flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-gray-900/50 p-8 md:p-12 rounded-2xl border border-white/5 backdrop-blur-sm">
        <h1 className="text-3xl font-display text-white mb-2 text-center">Join Sphynx</h1>
        <p className="text-gray-400 text-center mb-8 text-sm uppercase tracking-widest">Begin your journey</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
              <input {...register("firstName", { required: true })} className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-sphynx-gold outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
              <input {...register("lastName", { required: true })} className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-sphynx-gold outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
            <input type="email" {...register("email", { required: true })} className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-sphynx-gold outline-none" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
            <input type="password" {...register("password", { required: true })} className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-sphynx-gold outline-none" />
          </div>

          <button type="submit" className="w-full border border-sphynx-gold text-sphynx-gold py-4 font-bold uppercase tracking-widest hover:bg-sphynx-gold hover:text-black transition-colors duration-300">
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account? <Link to="/login" className="text-white hover:text-sphynx-gold transition-colors">Login</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;