<template>
  <div class="register-page">
    <form class="register-form" @submit.prevent="submitForm">
      <h2 class="welcometxt">Welcome to EduNest</h2>

      <!-- Avatar selection -->
      <div class="form-group">
        <label>Select an Avatar:</label>
        <div class="avatar-gallery">
          <img 
            v-for="(avatar, index) in predefinedAvatars" 
            :key="index" 
            :src="avatar" 
            :class="{ selected: avatar === avatarUrl }" 
            @click="selectPredefinedAvatar(avatar)"
            class="avatar-option"
            alt="Predefined Avatar"
          />
        </div>
      </div>

      <!-- Custom avatar upload -->
      <div class="form-group">
        <label for="avatar">Or Upload Your Own:</label>
        <div class="file-upload">
          <input type="file" @change="handleAvatarUpload" id="avatar" name="avatar" accept="image/*">
        </div>
        <div v-if="avatarUrl">
          <img :src="avatarUrl" alt="Avatar Preview" class="avatar-preview">
        </div>
      </div>

      <div class="form-group">
        <label for="role">I am a:</label>
        <select v-model="role" id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" name="name" required>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" name="email" required>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" name="password" required>
      </div>

      <div class="form-group">
        <label for="new-password">New Password:</label>
        <input type="password" v-model="newPassword" id="new-password" name="new-password" required>
      </div>

      <div class="form-group">
        <button type="submit" class="regbutton">Register</button>
      </div>
    </form>

    <!-- Modal Prompt -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Registration Successful!</h3>
        <p>Welcome to EduNest, {{ name }}!</p>
        <button @click="closeModal">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar1 from '../assets/1.png';
import Avatar2 from '../assets/3.png';
import Avatar3 from '../assets/14.png';
import Avatar4 from '../assets/22.png';
import Avatar5 from '../assets/24.png';

export default {
  name: 'RegisterForm',
  data() {
    return {
      role: 'student',
      name: '',
      email: '',
      password: '',
      newPassword: '',
      predefinedAvatars: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5],
      avatarUrl: '',
      customAvatar: null,
      showModal: false, // Modal visibility
    };
  },
  methods: {
  selectPredefinedAvatar(avatar) {
    this.avatarUrl = avatar;
    this.customAvatar = null;
  },
  handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.customAvatar = file;
      this.avatarUrl = URL.createObjectURL(file);
    }
  },
  submitForm() {
    this.showModal = true; // Show the modal after submission
    setTimeout(() => {
      this.redirectToMainPage(); // Redirect after showing the modal for 2 seconds
    }, 2000); // Adjust delay as needed
  },
  closeModal() {
    this.showModal = false; // Close the modal
  },
  redirectToMainPage() {
    window.location.href = "/main"; // Replace "/main" with your main page route
  },
  resetForm() {
    this.role = 'student';
    this.name = '';
    this.email = '';
    this.password = '';
    this.newPassword = '';
    this.avatarUrl = '';
    this.customAvatar = null;
  },
}
};

</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #52A2F9;
}

.register-form {
  background-color: #F9A252;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.welcometxt {
  font-weight: bold;
  color: white;
  font-size: 40px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.avatar-gallery {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.avatar-option {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s ease;
}

.avatar-option.selected {
  border: 2px solid #0056b3;
}

.avatar-preview {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.regbutton {
  font-size: 15px;
  font-weight: bolder;
  width: 100%;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.regbutton:hover {
  background-color: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal button:hover {
  background-color: #003f8a;
}
</style>
