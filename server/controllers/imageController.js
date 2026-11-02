
import axios from 'axios'
import userModel from "../models/userModel.js"
import FormData from 'form-data'

export const generateImage = async (req, res) => {
    try {

        // Get userId from authentication middleware
        const userId = req.userId
        const { prompt } = req.body

        // Find user in database
        const user = await userModel.findById(userId)

        if (!user || !prompt) {
            return res.json({
                success: false,
                message: 'Missing Details'
            })
        }

        // Check credit balance
        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                message: 'No Credit Balance',
                creditBalance: user.creditBalance
            })
        }

        // Create FormData
        const formData = new FormData()
        formData.append('prompt', prompt)

        // Call Clipdrop API
        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'x-api-key': process.env.CLIPDROP_API
                },
                responseType: 'arraybuffer'
            }
        )

        // Convert image into Base64
        const base64Image = Buffer.from(data).toString('base64')

        const resultImage = `data:image/png;base64,${base64Image}`

        // Deduct one credit
        await userModel.findByIdAndUpdate(user._id, {
            $inc: { creditBalance: -1 }
        })

        // Send response
        res.json({
            success: true,
            message: "Image Generated",
            creditBalance: user.creditBalance - 1,
            resultImage
        })

    } catch (error) {
        console.log(error)

        res.json({
            success: false,
            message: error.response?.data?.toString() || error.message
        })
    }
}
