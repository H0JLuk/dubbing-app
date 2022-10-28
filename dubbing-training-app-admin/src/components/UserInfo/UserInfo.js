import Select from "react-select";

import styles from './UserInfo.module.scss'

const UserInfo = (props) => {
    const {
        activeUser,
        allGroups,
        changeHandler,
        deleteHandler,
        editHandler,
        eyeHandler,
        setGroupsOptions,
        onKeydownHandler,
        setGroups,
        groups,
        editMode,
        passwordVision,
        emailRef,
        passwordRef,
        groupsRef,
        adminRef,
        noteRef
    } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.line}>
                <div className={styles.field}>
                    <label htmlFor="user-email" className={styles.label}>Email</label>
                    <input
                        id='user-email'
                        name='email'
                        type="email"
                        className={styles.input + ' ' + styles.email}
                        ref={emailRef}
                        maxLength='50'
                        onChange={changeHandler}
                        required
                    />
                </div>

                <div className={styles.passwordWrapper}>
                    <div className={styles.field}>
                        <label htmlFor="user-password" className={styles.label}>Password</label>
                        <input
                            id='user-password'
                            name='password'
                            type={passwordVision ? 'text' : 'password'}
                            className={styles.input + ' ' + styles.password}
                            ref={passwordRef}
                            maxLength='50'
                            minLength='6'
                            disabled={!editMode}
                            onChange={changeHandler}
                            onKeyDown={onKeydownHandler}
                        />
                    </div>

                    <button
                        type='button'
                        className={styles.eye + ' ' + (passwordVision ? styles.active : '')}
                        onClick={eyeHandler}
                        disabled={!editMode}
                    />

                    <button
                        type='button'
                        className={styles.edit + ' ' + (editMode ? styles.active : '')}
                        onClick={editHandler}
                    />
                </div>
            </div>

            <div className={styles.line}>
                <div className={styles.field}>
                    <label htmlFor="scene-groups" className={styles.label}>Groups</label>

                    <Select
                        id='scene-groups'
                        options={setGroupsOptions(allGroups)}
                        name='groups'
                        isMulti
                        classNamePrefix='select'
                        ref={groupsRef}
                        defaultValue={setGroupsOptions(activeUser.groups)}
                        onChange={value => {
                            setGroups(value);
                            changeHandler();
                        }}
                        value={groups}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="user-note" className={styles.label}>Note</label>
                    <textarea
                        id='user-note'
                        name='note'
                        className={styles.input + ' ' + styles.note}
                        ref={noteRef}
                        rows={3}
                        maxLength='200'
                        onChange={changeHandler}
                    />
                </div>
            </div>

            <div className={styles.field + ' ' + styles.checkWrapper}>
                <input
                    id='user-admin'
                    name='admin'
                    type="checkbox"
                    className={styles.checkbox}
                    ref={adminRef}
                    onChange={changeHandler}
                />
                <label htmlFor="user-admin" className={styles.admin}>Admin</label>
            </div>

            <div className={styles.controls}>
                <button className={styles.save}>Save changes</button>

                <button type='button' className={styles.delete} onClick={deleteHandler}>Delete user</button>
            </div>
        </div>
    )
}

export default UserInfo;