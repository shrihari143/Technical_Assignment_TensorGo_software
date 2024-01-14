import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Return = () => {
    const navigate = useNavigate()
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        console.log(sessionId)

        fetch(`/embedded/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
            setStatus(data.status);
            setCustomerEmail(data.customer_email);
        });
    }, []);

    if (status === 'open') {
        return (
            navigate('/embedded')
        )
    }

    if (status === 'complete') {
        return (
        <section id="success">
            <div className="alert alert-success text-center">
                <h4 className="alert-heading">Payment Successfull</h4>
                <p>
                We appreciate your business! A confirmation email will be sent to {customerEmail}.

                If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </div>
        </section>
        )
    }

    return null;
}

export default Return
