import React from 'react';
import { useCreateWishlist } from '@magento/peregrine/lib/talons/WishlistPage/useCreateWishlist';
import defaultClasses from '@magento/venia-ui/lib/components/WishlistPage/createWishlist.module.css';
import overrideClasses from './createWishlist.module.css';
import useStyle from '@magento/peregrine/lib/util/shallowMerge';
import FormError from '@magento/venia-ui/lib/components/FormError';
import Field from '../Field/field';
import TextInput from '../TextInput/textInput';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { FormattedMessage } from 'react-intl';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import dialogClasses from './dialog.module.css';


export const CreateWishlist = (props) => {
  const { numberOfWishlists } = props

  const talonProps = useCreateWishlist({ numberOfWishlists });
  const classes = useStyle(defaultClasses, overrideClasses, props.classes);

  const {
    handleCreateList,
    handleHideModal,
    handleShowModal,
    isModalOpen,
    formErrors,
    loading,
  } = talonProps;

  const shouldRender = true;

  return shouldRender ? (
    <div className={classes.root}>
      <button
        className={classes.createButton}
        onClick={handleShowModal}
        type="button"
        data-cy="createWishlist-createButton"
      >
        <div className={classes.labelContainer}>
          <span>
                        <FormattedMessage
                          id={'createWishlist.handleCreateListText'}
                          defaultMessage={'Create a new list'}
                        />
                    </span>
        </div>
      </button>
      <Dialog
        classes={{
          ...dialogClasses,
          mask: classes.dialogMask,
          form: classes.dialogForm,
          headerText: classes.dialogHeaderText,
          buttons: classes.buttons
        }}
        cancelText={'Cancel'}
        confirmText={'Save'}
        formProps={{ initialValues: { visibility: 'PRIVATE' } }}
        isModal={true}
        isOpen={isModalOpen}
        onCancel={handleHideModal}
        onConfirm={handleCreateList}
        shouldUnmountOnHide={true}
        title={'New Favorites List'}
        shouldDisableConfirmButton={loading}
      >
        <div className={classes.form}>
          <FormError errors={Array.from(formErrors.values())} />
          <Field
            classes={{ root: classes.listName }}
            label={'List Name'}
          >
            <TextInput
              field="name"
              validate={isRequired}
              validateOnBlur
              data-cy="createWishlist-name"
            />
          </Field>
        </div>
      </Dialog>
    </div>
  ) : null;
};
