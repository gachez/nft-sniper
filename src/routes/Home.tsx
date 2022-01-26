import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChromeMessage, Sender } from "../types";
import Logo from '../logo.png';
import Pin from '../pin.png'
import './Home.css'

const Gem = 'https://observer.com/wp-content/uploads/sites/2/2021/08/Yuga-Labs-Bored-Ape-Yacht-Club-5812.jpg?quality=80&strip'
const Outlier = 'https://lh3.googleusercontent.com/Ua9aGuQ_rr4beNn_jSDHseBeINCoDvsR_ggHSGc-I6Ci57CdwS2zWuYd0P8ibIv06O-QFgBDI4E16x4k4utyHq3EkSFYj8NuMIxJ=w1400-k'
const gems = [
    {
        gemImg: Gem,
        price: 10.1 ,
        rank: 90
    },
    {
        gemImg: Gem,
        price: 10.1 ,
        rank: 90
    },
    {
        gemImg: Gem,
        price: 10.1 ,
        rank: 90
    }
]

const outliers = [
    {
        outlierImg: Outlier,
        priceSold: 5.99,
        price: 10.1 ,
        rank: 90
    },
    {
        outlierImg: Outlier,
        priceSold: 5.99,
        price: 10.1 ,
        rank: 90
    },
    {
        gemImg: Outlier,
        priceSold: 5.99,
        price: 10.1 ,
        rank: 90
    }
]

const styles = {
    containerStyle: {
      height: '100%',
      padding: '1rem',
    },
    topBar: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: 'solid 1px rgba(255,255,255,0.6)'
    },
    logo: {
        width: '84px',
        height: '100%',
    },
    stats: {
        width: '180px',
        height: '100%',
        color: 'aliceblue'
    },
    infoContainer: {
        paddingTop: '24px',
        width: '100%',
        height: 'auto'
    },
    infoTitle: {
        fontSize: '1.25rem',
        fontWeight: 500,
        color: 'yellow'
    },
    infoGrid: {
        display: 'flex',
        height: 'auto',
        gap: '8px',
    },
    infoGridItem: {
        justifyContent:'center',
        width: '120px',
        height: '100%',
        borderRadius:'8px',
        boxShadow: '1px 1px rgba(255,255,255,0.8)'
    },
    infoImg: {
        height: '96px',
        width: '90px'
    },
    infoTextGrid: {
        display: 'grid',
    },
    infoText: {
        color: 'white',
    },
    infoBtn: {
    }
}

export const Home = () => {
    const [url, setUrl] = useState<string>('');
    const [responseFromContent, setResponseFromContent] = useState<string>('');

    let {push} = useHistory();

    /**
     * Get current URL
     */
    useEffect(() => {
    }, []);


    return (
        <div className="Container" style={styles.containerStyle} >
            <header className="TopBar" style={styles.topBar} >
                <img src={Logo} className="logo" style={styles.logo} />
                <div className="stats" style={styles.stats}>
                    <span className="statsTitle">Current stats</span>
                    <div className="statsInfo"><span>Enhance your shopping experience</span></div>
                </div>
            </header>
            <div className="InfoContainer" style={styles.infoContainer}>
                <div style={{display: 'flex', justifyContent: 'center'}} >
                <h1 className="InfoTitle" style={styles.infoTitle} >Pinned NFTs</h1>
                <img src={Pin} style={{width: '48px', height: '48px'}} />
                </div>
                <div className="InfoGrid" style={styles.infoGrid}>
                    {
                        gems.map(gem => {
                            return (
                                <div className="InfoGridItem" style={styles.infoGridItem}>
                                    <img src={Gem} style={{width: '100%',height: '80%', objectFit: 'cover' }} />
                                    <div style={styles.infoTextGrid}>
                                    <span style={styles.infoText} >PRICE: {gem.price}</span>
                                    <span style={styles.infoText} >RANK: {gem.rank}</span>
                                    <div className="btn btn-warning" >Buy</div>
                                   </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="InfoContainer" style={styles.infoContainer}>
                <h1 className="InfoTitle" style={styles.infoTitle} >Recommended gems</h1>
                <div className="InfoGrid" style={styles.infoGrid}>
                    {
                        gems.map(gem => {
                            return (
                                <div className="InfoGridItem" style={styles.infoGridItem}>

                                    <img src={Outlier} style={{width: '100%',height: '80%', objectFit: 'cover' }} />
                                    <div style={styles.infoTextGrid}>
                                    <span style={styles.infoText} >PRICE: {gem.price}</span>
                                    <span style={styles.infoText} >RANK: {gem.rank}</span>
                                    <div className="btn btn-warning" >Buy</div>
                                   </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="InfoContainer" style={styles.infoContainer}>
                <h1 className="InfoTitle" style={styles.infoTitle} >Outliers</h1>
                <div className="InfoGrid" style={styles.infoGrid} >
                    {
                        outliers.map(outlier => {
                            return (
                                <div className="InfoGridItem" style={styles.infoGridItem}>

                                    <img src={Outlier} style={{width: '100%',height: '80%', objectFit: 'cover' }} />
                                    <div style={styles.infoTextGrid}>
                                    <span style={styles.infoText} >PRICE: {outlier.price}</span>
                                    <span style={styles.infoText}>SALE PRICE: {outlier.priceSold}</span>
                                    <span style={styles.infoText}>RANK: {outlier.rank}</span>
                                    <div className="btn btn-warning">Buy</div>
                                  </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
