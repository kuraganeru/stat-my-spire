import React from 'react'

const SubmitForm = (props) => {

    const handleSetRawRun = ev => {
        props.setRawRun(ev.target.files[0])
    }

    const createFormData = uploadedValue => {
        let formDataToUpload = new FormData()
        formDataToUpload.append('runData', uploadedValue)
        return formDataToUpload
    }

    const uploadFormData = async formData => {
        const uploadUrl = 'http://localhost:5000/upload_files'
        const uploadParams = {
            method: "POST",
            body: formData
        }

        const response = await fetch(uploadUrl, uploadParams).catch((err) => {
            if (!err.response) {
                throw new Error("Server is offline")
            } else {
                throw new Error(err)
            }
        })
        const responseJSON = await response.json()
        return responseJSON
    }

    const handleSubmit = async ev => {
        ev.preventDefault();
        try {
            const createdFormData = createFormData(props.rawRun)
            const uploadResponse = await uploadFormData(createdFormData)
            props.setFormattedRun(uploadResponse)
        } catch (error) {
            throw new Error(error)
        } finally {
            console.log("Upload complete")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="files" id="files" accept=".run" onChange={handleSetRawRun}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default SubmitForm