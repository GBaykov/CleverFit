import { CalendarTwoTone } from '@ant-design/icons';
import { DatePicker, Form, Input, Typography, UploadFile } from 'antd';
import { PersonalInfo, StyledDatePicker, UserInfoFields } from './styled';
import { ModalNotificationType, ProfileInfoFormName } from '@constants/enums';
import { ImageUploader } from '../imageUploader';
import { FORMAT_D_M_Y_POINT } from '@utils/format-date';
import { LocalData } from '@constants/calendar-options';
import { useWindowSize } from '@uidotdev/usehooks';

type ProfileInfoProps = {
    setCurrentImage: (img: UploadFile) => void;
    setModal: (open: boolean) => void;
    setModalType: (type: ModalNotificationType) => void;
    imgSrc?: string;
};

export const ProfileInfo = (props: ProfileInfoProps) => {
    const { imgSrc, setCurrentImage, setModal, setModalType } = props;

    const size = useWindowSize();
    const isDesktop = Number(size.width) && Number(size.width) > 360;

    const datePickerStyle = {
        popupStyle: {
            maxWidth: isDesktop ? '350px' : '312px',
            width: '100%',
        },
    };

    return (
        <fieldset>
            <legend style={{ margin: 0, border: 0 }}>
                <Typography.Title style={{ marginBottom: '24px' }} level={5}>
                    Личная информация
                </Typography.Title>
                <PersonalInfo>
                    <ImageUploader
                        imgSrc={imgSrc}
                        setCurrentImage={setCurrentImage}
                        setModal={setModal}
                        setModalType={setModalType}
                    />

                    <UserInfoFields>
                        <Form.Item name='firstName'>
                            <Input type='text' placeholder='Имя' data-test-id='profile-name' />
                        </Form.Item>
                        <Form.Item
                            name={ProfileInfoFormName.LAST_NAME}
                            data-test-id='profile-surname'
                        >
                            <Input type='text' placeholder='Фамилия' />
                        </Form.Item>
                        <Form.Item name={ProfileInfoFormName.BIRTHDAY}>
                            <StyledDatePicker
                                data-test-id='profile-birthday'
                                locale={LocalData}
                                format={FORMAT_D_M_Y_POINT}
                                popupStyle={datePickerStyle.popupStyle}
                                placeholder='Дата рождения'
                                suffixIcon={<CalendarTwoTone />}
                            />
                        </Form.Item>
                    </UserInfoFields>
                </PersonalInfo>
            </legend>
        </fieldset>
    );
};
