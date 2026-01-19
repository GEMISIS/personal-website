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

      <div className="well well-sm">
        <Form
          id="contact_form"
          onSubmit={handleSubmit}
          action={formAction}
          method="POST"
          className="container"
          style={{ marginBottom: '16px' }}
        >
          <fieldset>
            <legend className="text-center">
              Need to contact me? Use this form!
            </legend>

            {/* Hidden field for Formspree */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} />

            {/* Name */}
            <Form.Group className="form-group row">
              <Form.Label className="col-sm-2 control-label contact_form_label" htmlFor="contact_name">
                Name
              </Form.Label>
              <div className="col-sm-9 input">
                <Form.Control
                  type="text"
                  id="contact_name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>

            {/* Email */}
            <Form.Group className="form-group row">
              <Form.Label className="col-sm-2 control-label contact_form_label" htmlFor="contact_email">
                Email
              </Form.Label>
              <div className="col-sm-9 input">
                <Form.Control
                  type="email"
                  id="contact_email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>

            {/* Subject */}
            <Form.Group className="form-group row">
              <Form.Label className="col-sm-2 control-label contact_form_label" htmlFor="contact_subject">
                Subject
              </Form.Label>
              <div className="col-sm-9 input">
                <Form.Select
                  id="contact_subject"
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
              </div>
            </Form.Group>

            {/* Message */}
            <Form.Group className="form-group row">
              <Form.Label className="col-sm-2 control-label contact_form_label" htmlFor="contact_message">
                Message
              </Form.Label>
              <div className="col-sm-9 input">
                <Form.Control
                  as="textarea"
                  id="contact_message"
                  name="message"
                  rows={5}
                  placeholder="Please enter your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>

            {/* Submit button */}
            <div className="form-check text-center">
              {!config.static && (
                <div id="contact_send_receipt" className="form-check form-check-inline">
                  <input className="form-check-input" name="contact_send_receipt" type="checkbox" defaultChecked />
                  <label className="form-check-label" htmlFor="contact_send_receipt">Send Receipt</label>
                  <br />
                  <br />
                </div>
              )}
              {useRecaptchaButton ? (
                <div ref={recaptchaRef}></div>
              ) : (
                <Button
                  id="submit_button"
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </Button>
              )}
              <br />
              <br />
            </div>
          </fieldset>
        </Form>
      </div>
    </>
  );
}
