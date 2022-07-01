import React, { useState } from 'react';
import './Collapsible.css';
import { AiOutlineFolderAdd } from 'react-icons/ai';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';

interface IProps {
  open?: boolean;
  title: string;
  children: React.ReactNode;
}

export const Collapasible: React.FC<IProps> = ({ open, children, title }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleFilterOpening = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="container-container">
      <div className="collapse-container">
        <button type="button" className="btn" onClick={handleFilterOpening}>
          {!isOpen ? (
            <AiOutlineFolderAdd className="collapse-icon" size={30} />
          ) : (
            <TbLayoutSidebarRightCollapse
              className="collapse-icon2"
              size={30}
            />
          )}
        </button>
        <h3 className="add-repo-dash">Add repo to Dashboard</h3>
      </div>
      <div className="border-bottom">
        <div>{isOpen && <div className="p-3">{children}</div>}</div>
      </div>
    </div>
  );
};
