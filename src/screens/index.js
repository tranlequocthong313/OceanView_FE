//LoginScreen
export { default as LoginScreen } from './Login/LoginScreen';
export { default as UpdateInfoScreen } from './Login/UpdateInfoScreen';
export { default as ResetPasswordScreen } from './Login/ResetPasswordScreen';
export { default as OTPScreen } from './Login/OTPScreen';

//HomeScreen
export { default as HomeScreen } from './Home/HomeScreen';
export { default as DetailsHomeScreen } from './Home/DetailsHomeScreen';

//AccountScreen
export { default as ProfileScreen } from './Account/AccountScreen';

//AccountScreen -> { ProfileScreen, SettingsScreen, SupportScreen }
export { default as SettingsScreen } from './Account/Settings/SettingsScreen';
export { default as DetailsSettingsScreen } from './Account/Settings/DetailsSettingsScreen';
export { default as DetailsProfileScreen } from './Account/Profile/DetailsProfileScreen';
export { default as ChatScreen } from './Account/Supports/ChatScreen';
export { default as CreateReflectionScreen } from './Account/Supports/CreateReflectionScreen';

//ApartmentInfoScreen
export { default as ContactScreen } from './ApartmentInfo/ContactScreen';
export { default as AboutUsScreen } from './ApartmentInfo/AboutUsScreen';

//NotificationsScreen
export { default as NotificationScreen } from './Notifications/NotificationScreen';
export { default as DetailsNotifyScreen } from './Notifications/DetailsNotifyScreen';

//ServicesScreen
export { default as ServicesScreen } from './Services/ServicesScreen';

//ServicesScreen -> AccessCardScreen
export { default as AccessCardMainScreen } from './Services/AccessCard/AccessCardMainScreen';
export { default as RegisterAccessCardScreen } from './Services/AccessCard/RegisterAccessCardScreen';
export { default as CancelAccessCardScreen } from './Services/AccessCard/CancelAccessCardScreen';
export { default as ReissueAccessCardScreen } from './Services/AccessCard/ReissueAccessCardScreen';


//ServicesScreen -> ResidentCardScreen
export {default as RegisterResidentCardScreen } from './Services/ResidentCard/RegisterResidentCardScreen';
export { default as ResidentCardMainScreen } from './Services/ResidentCard/ResidentCardMainScreen';
export { default as CancelResidentCardScreen } from './Services/ResidentCard/CancelResidentCardScreen';
export { default as ReissueResidentCardScreen } from './Services/ResidentCard/ReissueResidentCardScreen';

//ServicesScreen -> ParkingCardScreen
export {default as ParkingCardMainScreen } from './Services/ParkingCard/ParkingCardMainScreen';
export { default as RegisterParkingCardScreen } from './Services/ParkingCard/RegisterParkingCardScreen';
export { default as CancelParkingCardScreen } from './Services/ParkingCard/CancelParkingCardScreen';
export { default as ReissueParkingCardScreen } from './Services/ParkingCard/ReissueParkingCardScreen';
