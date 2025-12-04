import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio Contact: ${formState.name}`,
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-32 px-4 md:px-8 relative max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-serif-display text-4xl md:text-5xl mb-4">
          Initialize <span className="text-accent-glow italic">Handshake</span>
        </h2>
        <p className="font-mono text-sm text-text-muted">
          // SEND_TRANSMISSION_TO_CORE
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-6 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="font-mono text-xs text-text-muted uppercase tracking-wider ml-1">
              Identity
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formState.name}
              onChange={handleChange}
              className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent-glow/50 focus:ring-1 focus:ring-accent-glow/50 transition-all placeholder:text-white/10"
              placeholder="John Doe"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="font-mono text-xs text-text-muted uppercase tracking-wider ml-1">
              Frequency (Email)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formState.email}
              onChange={handleChange}
              className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent-glow/50 focus:ring-1 focus:ring-accent-glow/50 transition-all placeholder:text-white/10"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="font-mono text-xs text-text-muted uppercase tracking-wider ml-1">
            Transmission Data
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formState.message}
            onChange={handleChange}
            className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent-glow/50 focus:ring-1 focus:ring-accent-glow/50 transition-all placeholder:text-white/10 resize-none"
            placeholder="Enter your message here..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className={`
              group relative px-8 py-3 rounded-lg font-mono text-sm overflow-hidden transition-all duration-300
              ${status === 'success' 
                ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/50' 
                : 'bg-white text-black hover:bg-gray-200 border border-transparent'}
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {status === 'submitting' && (
                <>Processing...</>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle size={16} />
                  Transmission Sent
                </>
              )}
              {status === 'idle' && (
                <>
                  Send Message
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle size={16} />
                  Error
                </>
              )}
            </span>
          </button>
        </div>
      </motion.form>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent-glow/5 blur-[100px] -z-10 rounded-full pointer-events-none" />
    </section>
  );
};

export default ContactForm;
