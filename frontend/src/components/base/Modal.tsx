import { Text, Button } from './';

type TModal = {
  isOpen: boolean;
  type: 'delete' | 'edit' | 'confirm';
  invoiceId?: string;
  openModal: () => void;
};

export const Modal = ({ isOpen, type, invoiceId, openModal }: TModal) => {
  if (!isOpen) return;

  const options = {
    delete: {
      title: 'Confirm Deletion',
      body: `Are you sure you want to delete invoice ${invoiceId}? `,
    },
    edit: {
      title: 'Edit Invoice',
      body: `Are you sure you want to delete invoice ${invoiceId}? `,
    },
    confirm: {
      title: 'Confirm Invoice',
      body: `Are you sure you want to delete invoice ${invoiceId} `,
    },
  }[type];

  const buttons = {
    delete: {
      type: 'delete',
      label: 'Delete',
    },
    edit: {
      type: 'type',
      label: 'Edit',
    },
    confirm: {
      type: 'type',
      label: 'Confirm',
    },
  }[type];

  return (
    <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed left-1/2 top-1/2 z-10 w-screen -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white px-4 pb-4 pt-5 dark:bg-dark_primary md:p-6'>
              <div className='pl-5 pt-5 text-left'>
                <Text t='title' id='modal-title' customClasses='mb-5'>
                  {options.title}
                </Text>
                <div className='mt-2 max-w-lg'>
                  <Text
                    t='body'
                    customClasses='text-secondary_light_hover font-light dark:text-secondary_light'
                    tag='p'
                  >
                    {options.body}
                  </Text>
                  <Text
                    t='body'
                    customClasses='text-secondary_light_hover font-light mt-3 dark:text-secondary_light'
                    tag='p'
                  >
                    This action cannot be undone.
                  </Text>
                </div>
              </div>
            </div>
            <div className='flex justify-end gap-5 bg-white pb-10 pr-10 dark:bg-dark_primary'>
              <Button
                type='secondary'
                txt={'Cancel'}
                onClick={openModal}
                customClasses={
                  'bg-background_light hover:bg-secondary_light dark:bg-dark_primary_hover dark:text-secondary_light'
                }
              />
              <Button
                type={buttons.type as 'primary' | 'secondary' | 'delete' | 'third' | 'fourth'}
                txt={buttons.label}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
