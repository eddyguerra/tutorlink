import tkinter as tk
from tkinter import messagebox
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

tutors = {}
students = {}


class User:
    def __init__(self, first_name, last_name, user_type, username, password, email):
        self.first_name = first_name
        self.last_name = last_name
        self.user_type = user_type
        self.username = username
        self.password = password
        self.email = email


# Function to send a confirmation email
def send_confirmation_email(user_email, first_name):
    #I have configured my email to send a confirmation email when registered
    sender_email = "sadmansakib872@gmail.com"
    sender_password = "zafp fuwg eflk asqu"

    subject = "Registration Confirmation"
    body = f"Hello {first_name},\n\nThank you for registering. Your account has been successfully created!"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = user_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, user_email, msg.as_string())
        server.close()
        print(f"Confirmation email sent to {user_email}")
    except Exception as e:
        print(f"Failed to send email: {str(e)}")


# Function to register a new user
def register_user():
    def submit_registration():
        first_name = entry_first_name.get()
        last_name = entry_last_name.get()
        user_type = user_type_var.get()
        username = entry_username.get()
        password = entry_password.get()
        email = entry_email.get()

        if not first_name or not last_name or not username or not password or not email:
            messagebox.showerror("Error", "All fields are required")
            return

        if user_type == "student":
            user_list = students
        else:
            user_list = tutors

        if username in [user.username for user in user_list.values()]:
            messagebox.showerror("Error", "Username already exists")
            return

        # Store user data in the correct list based on user type
        user_list[username] = User(first_name, last_name, user_type, username, password, email)

        # Send confirmation email
        send_confirmation_email(email, first_name)

        messagebox.showinfo("Success", f"User {first_name} {last_name} registered successfully!")

        register_window.destroy()
        show_main_screen()  # Return to the main screen after registration
        print(user_list)

    register_window = tk.Toplevel(root)
    register_window.title("Register")

    tk.Label(register_window, text="First Name").pack()
    entry_first_name = tk.Entry(register_window)
    entry_first_name.pack()

    tk.Label(register_window, text="Last Name").pack()
    entry_last_name = tk.Entry(register_window)
    entry_last_name.pack()

    tk.Label(register_window, text="Email").pack()
    entry_email = tk.Entry(register_window)
    entry_email.pack()

    tk.Label(register_window, text="Username").pack()
    entry_username = tk.Entry(register_window)
    entry_username.pack()

    tk.Label(register_window, text="Password").pack()
    entry_password = tk.Entry(register_window, show="*")
    entry_password.pack()

    tk.Label(register_window, text="User Type").pack()
    user_type_var = tk.StringVar(value="student")
    tk.Radiobutton(register_window, text="Student", variable=user_type_var, value="student").pack()
    tk.Radiobutton(register_window, text="Tutor", variable=user_type_var, value="tutor").pack()

    submit_button = tk.Button(register_window, text="Submit", command=submit_registration)
    submit_button.pack()


def login_user():
    def submit_login():
        username = entry_username.get()
        password = entry_password.get()

        user = tutors.get(username) or students.get(username)
        if user and user.password == password:
            messagebox.showinfo("Welcome", f"Hello {user.first_name}")
            login_window.destroy()
            show_dashboard(user.first_name)
        else:
            messagebox.showerror("Error", "Invalid username or password")

    login_window = tk.Toplevel(root)
    login_window.title("Login")

    tk.Label(login_window, text="Username").pack()
    entry_username = tk.Entry(login_window)
    entry_username.pack()

    tk.Label(login_window, text="Password").pack()
    entry_password = tk.Entry(login_window, show="*")
    entry_password.pack()

    submit_button = tk.Button(login_window, text="Login", command=submit_login)
    submit_button.pack()


# Function to display user dashboard after login
def show_dashboard(first_name):
    def logout():
        messagebox.showinfo("Logged Out", "You have been logged out.")
        dashboard_window.destroy()
        show_main_screen()

    dashboard_window = tk.Toplevel(root)
    dashboard_window.title("Dashboard")

    tk.Label(dashboard_window, text=f"Hello {first_name}").pack()
    logout_button = tk.Button(dashboard_window, text="Logout", command=logout)
    logout_button.pack()


# Function to display the main screen with login and registration options
def show_main_screen():
    for widget in root.winfo_children():
        widget.destroy()

    tk.Label(root, text="Welcome to the Language Platform").pack()

    login_button = tk.Button(root, text="Login", command=login_user)
    login_button.pack()

    register_button = tk.Button(root, text="Register", command=register_user)
    register_button.pack()

    # Print tutors and students in the console to test out
    print("\nRegistered Tutors:")
    for user in tutors.values():
        print(f"Name: {user.first_name} {user.last_name}, Username: {user.username}, Email: {user.email}")

    print("\nRegistered Students:")
    for user in students.values():
        print(f"Name: {user.first_name} {user.last_name}, Username: {user.username}, Email: {user.email}")


root = tk.Tk()
root.title("Language Platform")
root.geometry("300x300")

show_main_screen()

root.mainloop()
