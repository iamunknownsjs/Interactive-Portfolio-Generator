import { useState } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (in a real app, you'd send to your backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="text-github-blue" size={24} />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Get In Touch
        </h3>
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-github-green rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="text-white" size={24} />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Message Sent!
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for reaching out. I&apos;ll get back to you soon!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-github-gray text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-github-blue focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-github-gray text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-github-blue focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-github-gray text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-github-blue focus:border-transparent resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed 
                       flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Or reach out via{' '}
          <a
            href="mailto:contact@example.com"
            className="text-github-blue hover:underline"
          >
            email directly
          </a>
        </p>
      </div>
    </div>
  );
}