// src/pages/Admin/AdminLogin.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';
import { ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);

  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      const res = await axios.post('/auth/login', data);

      // STRICT CHECK: Is this an admin?
      if (res.data.role !== 'admin') {
        dispatch(loginFailure('Access Denied'));
        toast.error('Access Denied: You are not an administrator.');
        return; // Stop here
      }

      dispatch(loginSuccess(res.data));
      toast.success('Welcome, Admin.');
      navigate('/admin');
      
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      dispatch(loginFailure(msg));
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 border-b border-sphynx-gold/20">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-10 rounded-xl relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-sphynx-gold"></div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-sphynx-gold/10 rounded-full flex items-center justify-center text-sphynx-gold mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-display text-white tracking-widest uppercase">Admin Portal</h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Restricted Access</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-xs uppercase text-gray-500 tracking-widest">Email</label>
            <input {...register("email", { required: true })} className="w-full bg-black border border-gray-700 mt-2 p-3 text-white focus:border-sphynx-gold outline-none" />
          </div>
          <div>
            <label className="text-xs uppercase text-gray-500 tracking-widest">Password</label>
            <input type="password" {...register("password", { required: true })} className="w-full bg-black border border-gray-700 mt-2 p-3 text-white focus:border-sphynx-gold outline-none" />
          </div>
          <button disabled={loading} className="w-full bg-sphynx-gold text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition disabled:opacity-50">
            {loading ? 'Verifying...' : 'Enter Console'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;