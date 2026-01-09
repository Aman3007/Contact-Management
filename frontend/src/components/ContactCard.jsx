import { Trash2, Mail, Phone, User, MessageSquare } from 'lucide-react';

const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition">
      <div className="flex justify-between mb-3">
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">{contact.name}</h3>
            <p className="text-xs text-gray-500">
              {new Date(contact.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <button
          onClick={() => onDelete(contact._id)}
          className="text-red-500 hover:bg-red-50 p-2 rounded"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex gap-2">
          <Mail className="h-4 w-4" />
          {contact.email}
        </div>
        <div className="flex gap-2">
          <Phone className="h-4 w-4" />
          {contact.phone}
        </div>

        {contact.message && (
          <div className="flex gap-2 pt-2 border-t">
            <MessageSquare className="h-4 w-4 mt-0.5" />
            <span className="text-xs">{contact.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCard;
