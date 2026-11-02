
import userModel from "../models/userModel.js";

const plans = {
    basic: {
        credits: 100,
        amount: 49
    },
    standard: {
        credits: 500,
        amount: 199
    },
    premium: {
        credits: 1000,
        amount: 349
    }
};

export const simulatePayment = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.userId;

        console.log("Plan ID:", planId);
        console.log("User ID:", userId);

        // Check package
        const selectedPlan = plans[planId];

        if (!selectedPlan) {
            return res.json({
                success: false,
                message: "Invalid package selected"
            });
        }

        // Find user
        const user = await userModel.findById(userId);

        console.log("MongoDB User:", user);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // Add credits
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $inc: {
                    creditBalance: selectedPlan.credits
                }
            },
            { new: true }
        );

        return res.json({
            success: true,
            message: "Demo payment successful!",
            creditsAdded: selectedPlan.credits,
            creditBalance: updatedUser.creditBalance
        });

    } catch (error) {
        console.log("Payment Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
