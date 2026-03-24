import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, TextInput } from "flowbite-react";
import { HiPlus } from "react-icons/hi";

export default function AddClientModal() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:outline-none focus:ring-0" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add user
        </div>
      </Button>

      <Modal show={isOpen} onClose={() => setOpen(false)} size="md" popup className="backdrop-blur-sm">
        {/* Wrap modal content in a styled div for background */}
        <div className="bg-[#923982] dark:bg-[#923982] rounded-xl p-6 shadow-lg">
          <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong className="text-white">Add new user</strong>
          </ModalHeader>

          <ModalBody>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName" className="text-white/90">Full Name</Label>
                <div className="mt-1">
                  <TextInput id="firstName" name="firstName" placeholder="Bonnie" className="bg-white/10 text-white" />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white/90">Stylist</Label>
                <div className="mt-1">
                  <TextInput id="lastName" name="stylist" placeholder="Green" className="bg-white/10 text-white" />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-white/90">Email</Label>
                <div className="mt-1">
                  <TextInput id="email" name="email" type="email" placeholder="example@company.com" className="bg-white/10 text-white" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="text-white/90">Phone number</Label>
                <div className="mt-1">
                  <TextInput id="phone" name="phone" type="tel" placeholder="e.g., +(12)3456 789" className="bg-white/10 text-white" />
                </div>
              </div>
              <div>
                <Label htmlFor="department" className="text-white/90">Department</Label>
                <div className="mt-1">
                  <TextInput id="department" name="department" placeholder="Development" className="bg-white/10 text-white" />
                </div>
              </div>
              <div>
                <Label htmlFor="company" className="text-white/90">Company</Label>
                <div className="mt-1">
                  <TextInput id="company" name="company" placeholder="Somewhere" className="bg-white/10 text-white" />
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="flex justify-center gap-x-3">
            <Button className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => setOpen(false)}>Add user</Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
}