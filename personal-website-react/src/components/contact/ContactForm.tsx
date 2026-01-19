'use client';

import { useState, FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useConfig } from '@/context/ConfigContext';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import Toast from './Toast';

export default function ContactForm() {
  const { config } = useConfig();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSuccess, setToastSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCaptchaSuccess = async (token: string) => {
    if (!config) return;

    setIsSubmitting(true);

    try {
      if (config.static && config.formspree_gold) {
        // Formspree Gold mode - AJAX submission
        const response = await fetch(config.formspree_link, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            _subject: config.contact_subjects[parseInt(formData.subject)],
            name: formData.name,
            message: formData.message,
          }),
        });

        if (response.ok) {
          setToastMessage('Email sent successfully!');
          setToastSuccess(true);
          setShowToast(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Failed to send email');
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setToastMessage('Error sending email. Please try again.');
      setToastSuccess(false);
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const recaptchaRef = useRecaptcha(
    config?.site_keys.google_recaptcha_key || '',
    handleCaptchaSuccess
  );

  const handleSubmit = (e: FormEvent) => {
    // For standard Formspree mode, allow default form submission
    if (config?.static && !config.formspree_gold) {
      return; // Let form submit normally
    }

    // For Gold mode, prevent default and handle via reCAPTCHA callback
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id.replace('contact_', '')]: e.target.value,
    });
  };

  if (!config) return null;

  const useRecaptchaButton = !config.static || config.formspree_gold;
  const formAction = config.static && !config.formspree_gold ? config.formspree_link : undefined;

  return (
    <>
      <Toast
        show={showToast}
        message={toastMessage}
        success={toastSuccess}
        onClose={() => setShowToast(false)}
      />

      <Form
        id="contact_form"
        onSubmit={handleSubmit}
        action={formAction}
        method="POST"
      >
        <h2>Contact Me</h2>

        <Form.Group className="mb-3" controlId="contact_name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contact_email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contact_subject">
          <Form.Label>Subject</Form.Label>
          <Form.Select
            name="_subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select a subject</option>
            {config.contact_subjects.map((subject, index) => (
              <option
                key={index}
                value={config.static && !config.formspree_gold ? subject : index}
              >
                {subject}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="contact_message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows={5}
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {useRecaptchaButton ? (
          <div className="mb-3">
            <div ref={recaptchaRef}></div>
          </div>
        ) : (
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        )}

        {!config.static && (
          <div className="alert alert-warning mt-3" id="contact_send_receipt">
            Dynamic mode is not currently supported.
          </div>
        )}
      </Form>
    </>
  );
}
