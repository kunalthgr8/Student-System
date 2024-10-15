import conf from "../../conf/conf.js";
import axios from "axios";
import Cookies from "js-cookie";

const backendURL = conf.backendUrl;

export class AuthService {
  constructor() {
    // Initialization logic (if needed)
  }

  async createAccount({ fullName: fullname, email, password }) {
    try {
      const response = await axios.post(`${backendURL}/api/v1/users/signup`, {
        fullname,
        email,
        password,
      });

      console.log("Response after Registration:", response);

      if (response.data.statusCode === 201) {
        // If registration is successful, auto-login the user
        return await this.login({ email, password });
      }

      throw new Error("Account creation failed");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      throw new Error(errorMessage);
    }
  }

  async login({ email, password }) {
    try {
      const response = await axios.post(`${backendURL}/api/v1/users/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data.data;
      console.log("Response after Login:", response);
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      Cookies.set("accessToken", accessToken, { secure: true, sameSite: 'Strict' });
      Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: 'Strict' });

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
  }

  async getCurrentUser() {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) throw new Error("Access token is missing");

      const response = await axios.get(`${backendURL}/api/v1/users/current-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch user";
      throw new Error(errorMessage);
    }
  }

  async logout() {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) throw new Error("Refresh token is missing");

      await axios.post(
        `${backendURL}/api/v1/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      // Clear tokens and localStorage
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.removeItem("userData");

      return { message: "Logged out successfully" };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed";
      throw new Error(errorMessage);
    }
  }

  async changePassword({ oldPassword, newPassword }) {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) throw new Error("Access token is missing");

      const response = await axios.post(
        `${backendURL}/api/v1/users/changePassword`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Password change failed";
      throw new Error(errorMessage);
    }
  }

  async changeUserDetails({ fullname, email }) {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) throw new Error("Access token is missing");

      const response = await axios.put(
        `${backendURL}/api/v1/users/updateUserDetails`,
        {
          fullname,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "User details update failed";
      throw new Error(errorMessage);
    }
  }

  async refreshAccessToken() {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) throw new Error("Refresh token is missing");

      const response = await axios.post(
        `${backendURL}/api/v1/users/refresh-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data.data;
      Cookies.set("accessToken", accessToken, { secure: true, sameSite: 'Strict' });
      Cookies.set("refreshToken", newRefreshToken, { secure: true, sameSite: 'Strict' });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Token refresh failed";
      throw new Error(errorMessage);
    }
  }
}

const authService = new AuthService();
export default authService;
