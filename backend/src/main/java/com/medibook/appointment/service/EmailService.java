package com.medibook.appointment.service;


import com.medibook.appointment.entities.Appointment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSimpleEmail(String to, String subject, String text) {
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@medibook.com"); // This only works for MailHog
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            mailSender.send(message);
        } catch(Exception e){
            // Log the exception but don’t crash the app
            System.out.println("Mail not sent: " + e.getMessage());
        }
    }


    public void sendRegistrationEmail(String to) {
        sendSimpleEmail(to, "Welcome to MediBook 🎉", "Your account has been created successfully! Waiting for approval from admin");
    }

    public void sendApprovalStatusEmail(String to) {
        sendSimpleEmail(to, "Account Approval", "Your account has been approved successfully! You can now access the app!");
    }

    public void sendDeleteEmail(String to) {
        sendSimpleEmail(to, "Account Deleted", "Your account has been deleted by the admin. If you want to access the application you will need to register again");
    }

    // For Appointments

    public void sendAppointmentConfirmationEmailPatient(String to, String date, String time, String doctor) {
        sendSimpleEmail(to, "Appointment Booked", "Appointment booked for " + date + " at " + time + " with Dr." + doctor);
    }

    public void sendAppointmentConfirmationEmailDoctor(String to, String date, String time) {
        sendSimpleEmail(to, "New Appointment", "New appointment for " + date + " at " + time );
    }

    public void sendAppointmentCancelationEmailPatient(String to, String date, String time, String doctor) {
        sendSimpleEmail(to, "Appointment canceled", "Your appointment set for " +  date + " at " + time + " with Dr." + doctor +" has been canceled.");
    }

    public void sendAppointmentCancelationEmailDoctor(String to, String date, String time) {
        sendSimpleEmail(to, "Appointment canceled", "An appointment set for " +  date + " at " + time + " has been canceled.");
    }

    public void sendAppointmentConfirmationbyDoctor(String to, String date, String time, String doctor) {
        sendSimpleEmail(to, "Appointment confirmed!", "Your appointment set for " +  date + " at " + time + " with Dr." + doctor + " has been confirmed.");
    }
}
