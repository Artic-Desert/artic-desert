import React, { useState } from 'react';
import './Collapsible.css';
import { AiOutlineFolderAdd } from 'react-icons/ai';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { NewRepo } from '../NewRepoComponent/NewRepo.component';

interface IProps {
  open?: boolean;
  title?: string;
  children: React.ReactNode;
}

export const Collapasible: React.FC<IProps> = ({ children, open }) => {
  const [isOpen, setIsOpen] = useState(!open);

  const handleFilterOpening = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="container-container">
      <div className="collapse-container" onClick={handleFilterOpening}>
        <button type="button" className="btn">
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
        <div>{isOpen && <NewRepo setIsOpen={setIsOpen} />}</div>
      </div>
    </div>
  );
};
