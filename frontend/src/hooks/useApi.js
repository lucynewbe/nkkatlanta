// useApi.js — lightweight fetch wrapper
import { useAuth } from '../context/AuthContext';

export function useApi() {
  const { token, logout } = useAuth();

  const request = async (url, options = {}) => {
    const headers = { ...(options.headers || {}) };
    
    // Auto-set JSON content-type if body is an object and not FormData
    if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) { logout(); throw new Error('Session expired'); }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || `HTTP ${res.status}`);
    }
    return res.json();
  };

  return {
    get:    (url)         => request(url),
    post:   (url, body)   => request(url, { 
      method: 'POST', 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
    put:    (url, body)   => request(url, { 
      method: 'PUT',  
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
    del:    (url)         => request(url, { method: 'DELETE' }),
    upload: (url, file)   => {
      const formData = new FormData();
      formData.append('image', file);
      return request(url, { method: 'POST', body: formData });
    }
  };
}

// useScrollReveal — accepts optional deps array so it re-runs after async data loads
import { useEffect } from 'react';
export function useScrollReveal(deps = []) {
  useEffect(() => {
    // Small delay so React finishes rendering new DOM nodes before we observe
    const timer = requestAnimationFrame(() => {
      const els = document.querySelectorAll('.reveal, .timeline-item');
      if (!els.length) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
      els.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    });
    return () => cancelAnimationFrame(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
