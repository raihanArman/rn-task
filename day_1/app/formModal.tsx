import Button from '@/components/Button';
import Input from '@/components/Input';
import { colors } from '@/constants/theme';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

interface FormModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (profile: any) => void;
    profileToEdit?: any;
}


const FormModal = ({ isVisible, onClose, onSubmit, profileToEdit }: FormModalProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (profileToEdit) {
            setName(profileToEdit.name);
            setEmail(profileToEdit.email);
            setPhone(profileToEdit.phone);
            setAddress(profileToEdit.address);
        } else {
            setName('');
            setEmail('');
            setPhone('');
            setAddress('');
        }
    }, [profileToEdit]);

    const handleSubmit = () => {
        if (!name || !email || !phone || !address) {
            Alert.alert('User', 'Please fill all fields');
            return;
        }


        const updatedProfile = {
            id: profileToEdit ? profileToEdit.id : Math.floor(Math.random() * 1000),
            name,
            email,
            phone,
            address,
        };

        onSubmit(updatedProfile);
        onClose();
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
            onDismiss={onClose}
            supportedOrientations={['portrait', 'landscape']}
            transparent={true}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.sheet}>
                    <Text style={styles.title}>{profileToEdit ? 'Edit Profile' : 'Add New Profile'}</Text>

                    <Input placeholder="Name" value={name} onChangeText={setName} />
                    <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                    <Input placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                    <Input placeholder="Address" value={address} onChangeText={setAddress} />

                    <Button style={styles.addButton} buttonText={profileToEdit ? 'Save Changes' : 'Add'} onPress={handleSubmit} />
                    <Button style={styles.backButton} buttonText="Cancel" onPress={onClose} />
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default FormModal;

const styles = StyleSheet.create({
    sheet: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: '80%',
        gap: 12,
        marginTop: 450,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    addButton: {
        height: 44,
        fontWeight: 'bold',
        marginTop: 8,
    },
    backButton: {
        height: 44,
        fontWeight: 'bold',
        backgroundColor: colors.red,
        marginTop: 8,
    },
});
