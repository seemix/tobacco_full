import React from 'react';
import { useSelector } from 'react-redux';
import i18n from 'i18next';

import './LangSwitcher.css';

const LangSwitcher = () => {
    const {
        languages
    } = useSelector(state => state.appearanceStore);
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return (
        <div className={'lang_switcher'}>
            {languages.map(item => <button key={item} className={i18n.language === item ? 'lang active_lang' : 'lang'}
                                      onClick={() => changeLanguage(item)}>{item}</button>)}
        </div>
    );
};

export default LangSwitcher;