import AppBar from '@/components/AppBar';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ProfileCard from '@/components/ProfileCard';
import { colors } from '@/constants/theme';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import AddModal from '../formModal';



const ProfileScreen = () => {
    const [data, setData] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            address: '123 Main St, Anytown, USA',
        }, {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '234-567-8901',
            address: '456 Oak Ave, Somewhere, USA',
        },
        {
            id: 3,
            name: 'Michael Johnson',
            email: 'michael.johnson@example.com',
            phone: '345-678-9012',
            address: '789 Pine Rd, Yourtown, USA',
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [profileToEdit, setProfileToEdit] = useState<any>(null);

    const handleSubmitProfile = (profile: any) => {
        if (profileToEdit) {
            setData((prev) =>
                prev.map((p) => (p.id === profile.id ? profile : p))
            );
            setProfileToEdit(null);
        } else {
            setData((prev) => [...prev, profile]);
        }
        setModalVisible(false);
    };


    const handleEditProfile = (profile: any) => {
        setProfileToEdit(profile);
        setModalVisible(true);
    };

    const handleDeleteProfile = (profileId: number) => {
        Alert.alert(
            'Delete Profile',
            'Are you sure you want to delete this profile?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteProfile(profileId),
                },

            ]
        )
    }

    const deleteProfile = (profileId: number) => {
        setData((prev) => prev.filter((p) => p.id !== profileId));
    }

    const filteredData = data.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.phone.includes(searchQuery)
    );

    return (
        <View style={styles.container}>
            <AppBar
                title="Profile"
                action={
                    <Button
                        style={styles.addButton}
                        buttonText="Add"
                        onPress={() => setModalVisible(true)}
                    />
                }
            />
            <View style={styles.search} >
                <Input
                    placeholder="Search by name, email, or phone"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <ProfileCard
                        {...item}
                        onEdit={() => handleEditProfile(item)}
                        onDelete={() => handleDeleteProfile(item.id)}
                    />
                )}
                style={styles.flat}
            />
            <AddModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmitProfile}
                profileToEdit={profileToEdit} // ini untuk edit
            />
        </View>
    );
};


export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flat: {
        padding: 16,
    },

    addButton: {
        backgroundColor: colors.primary,
        width: 80,
    },
    search: {
        padding: 16,
    }
})