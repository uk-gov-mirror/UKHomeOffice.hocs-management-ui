import React, { useEffect, useContext } from 'react';
import { Context } from '../contexts/application';
import { clearApiStatus } from '../contexts/actions/index';

interface NotificationProps {
    display: string;
    type: string;
}

interface NotificationWrapperProps extends NotificationProps {
    timeoutPeriod: number;
}

const Notification: React.FC<NotificationProps> = ({ type, display }) => (
    <div className={`notification${type === 'ERROR' ? ' notification--error' : ''}`}>
        {display}
    </div>
);

const Wrapper = (Notification: React.FC<NotificationProps>) => function NotificationWrapper({ timeoutPeriod = 1000, ...props }: NotificationWrapperProps) {
    const { dispatch } = useContext(Context);

    useEffect(() => {
        const timeout = setTimeout(() => dispatch(clearApiStatus()), timeoutPeriod);
        return () => clearTimeout(timeout);
    }, []);

    return (<Notification {...props} />);
};

export default Wrapper(Notification);
