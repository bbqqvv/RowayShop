"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import { useAddresses } from "@/hooks/address/useAddress";
import Modal from "react-modal";
import ChangePassword from "./ChangePassword";

interface OptionType {
    value: number;
    label: string;
}

const Profile: React.FC = () => {
    const {
        addresses,
        loading,
        error,
        addAddress,
        updateAddress,
        removeAddress,
        setDefaultAddress,
    } = useAddresses();

    const [provinces, setProvinces] = useState<OptionType[]>([]);
    const [districts, setDistricts] = useState<OptionType[]>([]);
    const [wards, setWards] = useState<OptionType[]>([]);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [newAddress, setNewAddress] = useState<Address>({
        id: Date.now(),
        recipientName: "",
        country: "Việt Nam",
        province: "",
        district: "",
        commune: "",
        addressLine: "",
        note: "",
        phoneNumber: "",
        email: "",
        defaultAddress: false,
    });

    // Fetch provinces
    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/?depth=1").then((res) => {
            setProvinces(res.data.map((p: { code: number; name: string }) => ({ value: p.code, label: p.name })));
        });
    }, []);

    // Handle province change
    const handleProvinceChange = (selected: SingleValue<OptionType>) => {
        if (!selected) return;
        setNewAddress(prev => ({ ...prev, province: selected.label, district: "", commune: "" }));

        axios.get(`https://provinces.open-api.vn/api/p/${selected.value}?depth=2`).then((res) => {
            setDistricts(res.data.districts.map((d: { code: number; name: string }) => ({ value: d.code, label: d.name })));
            setWards([]);
        });
    };

    // Handle district change
    const handleDistrictChange = (selected: SingleValue<OptionType>) => {
        if (!selected) return;
        setNewAddress(prev => ({ ...prev, district: selected.label, commune: "" }));

        axios.get(`https://provinces.open-api.vn/api/d/${selected.value}?depth=2`).then((res) => {
            setWards(res.data.wards.map((w: { code: number; name: string }) => ({ value: w.code, label: w.name })));
        });
    };


    // Handle commune change
    const handleCommuneChange = (selected: SingleValue<OptionType>) => {
        if (!selected) return;
        setNewAddress(prev => ({ ...prev, commune: selected.label }));
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setNewAddress(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle edit address
    const handleEditAddress = (address: Address) => {
        setNewAddress(address);
        setEditingId(address.id);
    };

    // Reset form
    const resetForm = () => {
        setNewAddress({
            id: Date.now(),
            recipientName: "",
            country: "Việt Nam",
            province: "",
            district: "",
            commune: "",
            addressLine: "",
            note: "",
            phoneNumber: "",
            email: "",
            defaultAddress: false,
        });
        setEditingId(null);
    };

    // Add or update address
    const handleAddOrUpdateAddress = async () => {
        if (!newAddress.addressLine || !newAddress.phoneNumber || !newAddress.email) {
            alert("Vui lòng nhập đầy đủ thông tin địa chỉ!");
            return;
        }

        if (editingId) {
            await updateAddress(editingId, newAddress);
        } else {
            await addAddress(newAddress);
        }
        resetForm();
    };


    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hồ sơ của tôi</h2>
                {/* Nút mở modal */}
                <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="text-red-500 font-bold"
                >
                    Thay đổi mật khẩu
                </button>
                <Modal
                    isOpen={isPasswordModalOpen}
                    onRequestClose={() => setIsPasswordModalOpen(false)}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <ChangePassword />
                        <button
                            onClick={() => setIsPasswordModalOpen(false)}
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Đóng
                        </button>
                    </div>
                </Modal>
            </div>
            {/* Address List */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Địa chỉ giao hàng</h2>
            {loading && <p>Đang tải...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {addresses?.map((address) => (
                <div
                    key={address.id}
                    className={`mb-4 p-4 border rounded-lg ${address.defaultAddress ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                >
                    <p className="text-gray-700">
                        <strong>Tên người nhận:</strong><span className="font-bold text-red-700"> {address.recipientName}</span>
                    </p>
                    <p className="text-gray-700">
                        <strong>Địa chỉ:</strong> {address.commune}, {address.district}, {address.province}, {address.country}
                    </p>
                    <p className="text-gray-700">
                        <strong>Địa chỉ chi tiết:</strong> {address.addressLine}
                    </p>
                    <p className="text-gray-700">
                        <strong>Email:</strong> {address.email}
                    </p>
                    <p className="text-gray-700">
                        <strong>SĐT:</strong> {address.phoneNumber}
                    </p>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setDefaultAddress(address.id)}
                            className={`px-4 py-2 text-sm rounded-lg ${address.defaultAddress ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {address.defaultAddress ? "Mặc định" : "Đặt làm mặc định"}
                        </button>
                        <button onClick={() => handleEditAddress(address)} className="text-blue-500 text-sm hover:text-blue-600">Chỉnh sửa</button>

                        <button
                            onClick={() => removeAddress(address.id)}
                            className="text-red-500 text-sm hover:text-red-600"
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            ))}

            {/* Add/Edit Address Form */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{editingId ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}</h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="recipientName"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Tên người nhận"
                        value={newAddress.recipientName}
                        onChange={handleChange}
                    />

                    <div>
                        <label className="block text-gray-700 mb-2">Tỉnh/Thành phố</label>
                        <Select
                            options={provinces}
                            onChange={handleProvinceChange}
                            placeholder="Chọn tỉnh/thành phố..."
                            value={provinces.find(option => option.label === newAddress.province)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Quận/Huyện</label>
                        <Select
                            options={districts}
                            onChange={handleDistrictChange}
                            placeholder="Chọn quận/huyện..."
                            isDisabled={!newAddress.province}
                            value={districts.find(option => option.label === newAddress.district)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Xã/Phường</label>
                        <Select
                            options={wards}
                            onChange={handleCommuneChange}
                            placeholder="Chọn xã/phường..."
                            isDisabled={!newAddress.district}
                            value={wards.find(option => option.label === newAddress.commune)}
                        />
                    </div>

                    <input
                        type="text"
                        name="phoneNumber"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Số điện thoại"
                        value={newAddress.phoneNumber}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Email"
                        value={newAddress.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="addressLine"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Địa chỉ chi tiết"
                        value={newAddress.addressLine}
                        onChange={handleChange}
                    />
                    <textarea name="note" className="w-full p-2 border rounded-lg" placeholder="Ghi chú (tuỳ chọn)" value={newAddress.note} onChange={handleChange} />

                    <div className="flex space-x-4">
                        <button
                            onClick={handleAddOrUpdateAddress}
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            {editingId ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
                        </button>
                        {editingId && (
                            <button
                                onClick={resetForm}
                                className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Hủy
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;