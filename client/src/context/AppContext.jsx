
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [credit, setCredit] = useState(0);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    // Load user and credit details
    const loadCreditsData = async () => {
        try {

            const { data } = await axios.get(
                `${backendUrl}/api/user/credits`,
                {
                    headers: { token }
                }
            );

            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Generate image
    const generateImage = async (prompt) => {
        try {

            const { data } = await axios.post(
                `${backendUrl}/api/image/generate-image`,
                { prompt },
                {
                    headers: { token }
                }
            );

            if (data.success) {
                await loadCreditsData();
                return data.resultImage;
            } else {
                toast.error(data.message);

                await loadCreditsData();

                if (data.creditBalance === 0) {
                    navigate('/buy');
                }
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        setCredit(0);
    };
    
const simulatePayment = async (planId) => {
    try {
        const { data } = await axios.post(
            `${backendUrl}/api/payment/simulate`,
            { planId },
            {
                headers: { token }
            }
        );

        if (data.success) {
            toast.success(data.message);

            await loadCreditsData();

            return true;
        } else {
            toast.error(data.message);
            return false;
        }

    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
        return false;
    }
};


    // Load credits when token changes
    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token]);

    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage,
        simulatePayment
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
